package controllers

import (
	"log"
	"time"
	"io/ioutil"
	"go.mongodb.org/mongo-driver/mongo"
	"encoding/json"
	"context"
	"../models"
	"../drivers"
	"../mailers"
	
	"net/http"
	"go.mongodb.org/mongo-driver/bson"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"golang.org/x/crypto/bcrypt"
	
)

func Subscribe(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var email models.Mailing
	err := json.NewDecoder(request.Body).Decode(&email)
	if err != nil {
		json.NewEncoder(response).Encode(err)
	}
	maillistcollection := client.Database("csstricks").Collection("mailinglist")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := maillistcollection.InsertOne(ctx, email)
	fmt.Print(result)
	mailing:=mailers.Subscribemail(email.Email)
	if mailing{
		json.NewEncoder(response).Encode("Thank you for subscribing to maillist")
	}else{
		log.Fatal("Error")
	}
	
}
func Logout(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Access-Control-Allow-Credentials", "true")
	expire := time.Now().Add(-7 * 24 * time.Hour)
	http.SetCookie(response, &http.Cookie{Name: "token",
		Value:   "",
		Expires: expire,
	})
}
func Authenticate(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	response.Header().Set("Access-Control-Allow-Credentials", "true")

	tokenString, err := request.Cookie("token")
	var auth models.Authstatus
	fmt.Println(err)
	if err != nil {
		auth.Username = ""
		auth.Firstname = ""
		auth.Lastname = ""
		auth.Authenticationstatus = false
		json.NewEncoder(response).Encode(auth)

	} else {
		if tokenString.Value == "" {
			auth.Username = ""
			auth.Firstname = ""
			auth.Lastname = ""
			auth.Authenticationstatus = false
			json.NewEncoder(response).Encode(auth)
			return
		} else {
			token, err := jwt.Parse(tokenString.Value, func(token *jwt.Token) (interface{}, error) {
				if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
					return nil, fmt.Errorf("Unexpected signing method")
				}
				return []byte("csstricks"), nil
			})
			var res models.ResponseResult
			if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
				auth.Username = claims["username"].(string)
				auth.Firstname = claims["firstname"].(string)
				auth.Lastname = claims["lastname"].(string)
				auth.Authenticationstatus = true
				json.NewEncoder(response).Encode(auth)
				return
			} else {
				res.Error = err.Error()
				json.NewEncoder(response).Encode(res)
				return
			}
		}
	}

}
func Login(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Access-Control-Allow-Credentials", "true")
	var user models.User
	body, _ := ioutil.ReadAll(request.Body)
	err := json.Unmarshal(body, &user)
	if err != nil {
		log.Fatal(err)
	}
	collection, err := drivers.GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	var result models.User
	var res models.ResponseResult
	err = collection.FindOne(context.TODO(), bson.D{{"username", user.Username}}).Decode(&result)
	if err != nil {
		res.Error = "Invalid username"
		json.NewEncoder(response).Encode(res)
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(result.Password), []byte(user.Password))
	expirationTime := time.Now().Add(60 * time.Minute).Unix()
	if err != nil {
		res.Error = "Invalid password"
		json.NewEncoder(response).Encode(res)
		return
	}
	refreshtoken := jwt.New(jwt.SigningMethodHS256)
	rtclaims := refreshtoken.Claims.(jwt.MapClaims)
	rtclaims["username"] = result.Username
	rtclaims["firstname"] = result.Firstname
	rtclaims["lastname"] = result.Lastname
	rtclaims["sub"] = 1
	rtclaims["exp"] = expirationTime
	tokenstring, err := refreshtoken.SignedString([]byte("csstricks"))
	if err != nil {
		res.Error = "error while generating token,try again"
		json.NewEncoder(response).Encode(res)
		return
	}
	result.Token = tokenstring
	result.Password = ""
	expire := time.Now().Add(1 * 24 * time.Hour)
	http.SetCookie(response, &http.Cookie{Name: "token",
		Value:   tokenstring,
		Expires: expire,
		Path:    "/",
	})
	json.NewEncoder(response).Encode(result)
}


func Adduser(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var user models.User
	body, _ := ioutil.ReadAll(request.Body)
	err := json.Unmarshal(body, &user)
	email := user.Email
	
	var res models.ResponseResult
	if err != nil {
		res.Error = err.Error()
		json.NewEncoder(response).Encode(res)
		return
	}
	collection, err := drivers.GetDBCollection()
	if err != nil {
		res.Error = err.Error()
		json.NewEncoder(response).Encode(res)
		return
	}
	var result models.User
	err = collection.FindOne(context.TODO(), bson.D{{"username", user.Username}}).Decode(&result)
	if err != nil {
		if err.Error() == "mongo: no documents in result" {
			hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 5)
			if err != nil {
				res.Error = "error while hashing password,try again"
				json.NewEncoder(response).Encode(res)
				return
			}
			user.Password = string(hash)
			_, err = collection.InsertOne(context.TODO(), user)
			if err != nil {
				res.Error = "error creating user"
				json.NewEncoder(response).Encode(res)
				return
			}
			res.Result = "Registration successful"
			registermail:=mailers.Registermail(email,user.Firstname,user.Lastname,user.Username)
			if registermail{
				json.NewEncoder(response).Encode(res)
				return
			}else{
				json.NewEncoder(response).Encode(res)
				return
			}
			
		}
		res.Error = err.Error()
		json.NewEncoder(response).Encode(res)
		return
	}
	res.Result = "Username already Exists!!"
	json.NewEncoder(response).Encode(res)
	return
}




var client *mongo.Client=drivers.Dbconnection()


