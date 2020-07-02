package main

import (
	"strconv"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gorilla/handlers"
	"gopkg.in/gomail.v2"

	"golang.org/x/crypto/bcrypt"

	"github.com/gorilla/mux"
	//httprouter "github.com/julienschmidt/httprouter"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

type Mailing struct {
	Email string `json:"email,omitempty" bson:"email,omitempty"`
}
type Post struct {
	ID              primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Articlemeta     string             `json:"articlemeta,omitempty" bson:"articlemeta,omitempty"`
	Articletitle    string             `json:"articletitle,omitempty" bson:"articletitle,omitempty"`
	Articledate     string             `json:"articledate,omitempty" bson:"articledate,omitempty"`
	Authorname      string             `json:"authorname,omitempty" bson:"authorname,omitempty"`
	Authorimagelink string             `json:"authorimagelink,omitempty" bson:"authorimagelink,omitempty"`
	Postcontent     string             `json:"postcontent,omitempty" bson:"postcontent,omitempty"`
	Username        string             `json:"username,omitempty" bson:"username,omitempty"`
}
type User struct {
	Username     string `json:"username" bson:"username"`
	Firstname    string `json:"firstname" bson:"firstname"`
	Lastname     string `json:"lastname" bson:"lastname"`
	Email        string `json:"email" bson:"email"`
	Phoneno      int64  `json:"phone" bson:"phone"`
	Password     string `json:"password" bson:"password"`
	Profileimage string `json:"profileimage" bson:"profileimage"`
	Token        string `json:"token" bson:"token"`
	//Post      []string `json:"post"`
}
type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}
type Authstatus struct {
	Username             string `json:"username"`
	Firstname            string `json:"firstname"`
	Lastname             string `json:"lastname"`
	Authenticationstatus bool   `json:"Authenticationstatus"`
}

func addpost(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	response.Header().Set("Access-Control-Allow-Credentials", "true")
	//tokenString, _ := request.Cookie("token")
	//fmt.Println("tokenString")
	//fmt.Println(tokenString)
	var post Post
	//var complete Post
	json.NewDecoder(request.Body).Decode(&post)
	//fmt.Println(&post)
	postcollection := client.Database("csstricks").Collection("posts")
	//usercollection :=client.Database("csstricks").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := postcollection.InsertOne(ctx, post)

	json.NewEncoder(response).Encode(result)
}
func bulkpost(response http.ResponseWriter, request *http.Request){
	
	response.Header().Set("content-type", "application/json")
	response.Header().Set("Access-Control-Allow-Credentials", "true")
	var data []Post
	
	json.NewDecoder(request.Body).Decode(&data)
	for i := 0; i < len(data); i++ {
		postcollection := client.Database("csstricks").Collection("posts")
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		result, _ := postcollection.InsertOne(ctx,data[i])

		fmt.Println(result)
		//json.NewEncoder(response).Encode(&result)
	}

	
		
	json.NewEncoder(response).Encode(strconv.Itoa(len(data))+" posts added successfully")
}
func getposts(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var posti []Post
	postcollection := client.Database("csstricks").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	cursor, err := postcollection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":"` + err.Error() + `"}`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var post Post
		cursor.Decode(&post)
		posti = append(posti, post)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(posti)
}
func getpost(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var post Post
	collection := client.Database("csstricks").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	err := collection.FindOne(ctx, Post{ID: id}).Decode(&post)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(post)
}
func getuserposts(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(request)
	username := vars["username"]
	fmt.Println(username)
	//json.NewEncoder(response).Encode(username)
	//var post Post
	collection := client.Database("csstricks").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	filtercursor, err := collection.Find(ctx, bson.M{"username": username})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	var posts []bson.M
	if err = filtercursor.All(ctx, &posts); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(response).Encode(posts)
}
func getuserprofile(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(request)
	username := vars["username"]
	fmt.Println(username)
	//json.NewEncoder(response).Encode(username)
	var user User
	collection := client.Database("csstricks").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	err := collection.FindOne(ctx, bson.M{"username": username}).Decode(&user)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}

	json.NewEncoder(response).Encode(user)
}
func updatepost(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])

	var post Post
	json.NewDecoder(request.Body).Decode(&post)

	collection := client.Database("csstricks").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	result, err := collection.UpdateOne(
		ctx,
		bson.M{"_id": id},
		bson.D{
			{"$set", post},
		},
	)

	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(result)
}
func deletepost(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	collection := client.Database("csstricks").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	result, err := collection.DeleteOne(
		ctx,
		bson.M{"_id": id},
	)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(result)
}
func GetDBCollection() (*mongo.Collection, error) {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return nil, err
	}
	// Check the connection
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, err
	}
	collection := client.Database("csstricks").Collection("users")
	return collection, nil
}

//user database
func adduser(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var user User
	body, _ := ioutil.ReadAll(request.Body)
	err := json.Unmarshal(body, &user)
	email:=user.Email
	mail := gomail.NewMessage()
	mail.SetHeader("From", "kumarvadivel1999@gmail.com")
	mail.SetHeader("To", email)
	mail.SetHeader("Subject", "Registration Successfull-csstricksclone.com")
	mail.SetBody("text/plain", "Thanks  Mr./Ms."+user.Firstname+" "+user.Lastname+"(@"+user.Username+") for joining the part of the family ..(csstricksclone) \n\n\n we at csstricksclone.com always make sure that your user expericence should not be compromised at any point of time.\n\n\n \nif you felt any bug in userexperience please report us immediately at \n\n\nreports@csstricksclone.com\n\n\nhappy blogging!!!\n\nWithRegards,\n\ncsstricksclone.com")
	dialer := gomail.NewPlainDialer("smtp.gmail.com", 587, "kumarvadivel1999@gmail.com", "rnrqdrmzvckbkbzc")
	if e := dialer.DialAndSend(mail); e != nil {
		panic(e)
		//json.NewEncoder(response).Encode(e)
	}
	fmt.Print("success")
	var res ResponseResult
	if err != nil {
		res.Error = err.Error()
		json.NewEncoder(response).Encode(res)
		return
	}
	collection, err := GetDBCollection()

	if err != nil {
		res.Error = err.Error()
		json.NewEncoder(response).Encode(res)
		return
	}
	var result User

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
			json.NewEncoder(response).Encode(res)
			return
		}
		res.Error = err.Error()
		json.NewEncoder(response).Encode(res)
		return
	}
	res.Result = "Username already Exists!!"
	json.NewEncoder(response).Encode(res)
	return
}

func login(response http.ResponseWriter, request *http.Request) {
	//response.Header().Set("Content-Type", "application/json")
	//response.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	response.Header().Set("Access-Control-Allow-Credentials", "true")
	var user User
	body, _ := ioutil.ReadAll(request.Body)
	err := json.Unmarshal(body, &user)
	if err != nil {
		log.Fatal(err)
	}
	collection, err := GetDBCollection()
	if err != nil {
		log.Fatal(err)
	}
	var result User
	var res ResponseResult

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

	/*token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username":  result.Username,
		"firstname": result.Firstname,
		"lastname":  result.Lastname,
	})*/

	tokenstring, err := refreshtoken.SignedString([]byte("csstricks"))

	if err != nil {
		res.Error = "error while generating token,try again"
		json.NewEncoder(response).Encode(res)
		return
	}
	result.Token = tokenstring
	result.Password = ""
	//cookieval := result.Token
	//expiration := time.Now().Add(365 * 24 * time.Hour)
	//fmt.Println(expiration)
	//c, err := request.Cookie("session")
	//if err != nil {
	//	c = &http.Cookie{Name: "jwt payload", Value: cookieval, Expires: expiration}
	//	http.SetCookie(response, c)
	//}
	//io.WriteString(response, c.String())
	expire := time.Now().Add(1 * 24 * time.Hour)
	http.SetCookie(response, &http.Cookie{Name: "token",
		Value:   tokenstring,
		Expires: expire,
		Path:    "/",
	})

	json.NewEncoder(response).Encode(result)
}
func authenticate(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	response.Header().Set("Access-Control-Allow-Credentials", "true")

	tokenString, err := request.Cookie("token")
	var auth Authstatus
	fmt.Println(err)
	if err != nil {
		auth.Username = ""
		auth.Firstname = ""
		auth.Lastname = ""
		auth.Authenticationstatus = false

		json.NewEncoder(response).Encode(auth)

	} else {
		fmt.Println(tokenString.Value)

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
			//var result User
			var res ResponseResult

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
func logout(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Access-Control-Allow-Credentials", "true")
	expire := time.Now().Add(-7 * 24 * time.Hour)
	//c, err := request.Cookie("token")

	http.SetCookie(response, &http.Cookie{Name: "token",
		Value:   "",
		Expires: expire,
	})

}
func subscribe(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	var email Mailing
	err := json.NewDecoder(request.Body).Decode(&email)
	if err != nil {
		json.NewEncoder(response).Encode(err)
	}
	maillistcollection := client.Database("csstricks").Collection("mailinglist")
	//usercollection :=client.Database("csstricks").Collection("users")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := maillistcollection.InsertOne(ctx, email)
	fmt.Print(result)
	//json.NewEncoder(response).Encode(email)
	mail := gomail.NewMessage()
	mail.SetHeader("From", "kumarvadivel1999@gmail.com")
	mail.SetHeader("To", email.Email)
	mail.SetHeader("Subject", "Subscription-csstricksclone.com")
	mail.SetBody("text/plain", "Thanks for subscribing to mailing list of csstricks-clone.com you will be recieving future messages regarding our updates")
	dialer := gomail.NewPlainDialer("smtp.gmail.com", 587, "kumarvadivel1999@gmail.com", "rnrqdrmzvckbkbzc")
	if e := dialer.DialAndSend(mail); e != nil {
		panic(e)
		json.NewEncoder(response).Encode(e)
	}
	fmt.Print("success")

	json.NewEncoder(response).Encode("Thank you for subscribing to maillist")

}
func getpostfilter(response http.ResponseWriter, request *http.Request){
	response.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(request)
	filter := vars["posttype"]
	collection := client.Database("csstricks").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	
	filtercursor, err := collection.Find(ctx, bson.M{"articlemeta":filter})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	var posts []bson.M
	if err = filtercursor.All(ctx, &posts); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(response).Encode(posts)
}
func main() {
	fmt.Println("Starting the application...")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, _ = mongo.Connect(ctx, clientOptions)
	r := mux.NewRouter()
	headers := handlers.AllowedHeaders([]string{"X-Requested-with", "Content-Type", "Authorisation"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:4200"})
	r.HandleFunc("/addpost", addpost).Methods("POST")
	r.HandleFunc("/addbulkpost",bulkpost).Methods("POST")
	r.HandleFunc("/getposts", getposts).Methods("GET")
	r.HandleFunc("/getposts/{id}", getpost).Methods("GET")
	r.HandleFunc("/getposts/filter/{posttype}", getpostfilter).Methods("GET")
	r.HandleFunc("/getposts/{id}/update", updatepost).Methods("PUT")
	r.HandleFunc("/getposts/{id}/delete", deletepost).Methods("DELETE")
	r.HandleFunc("/getuserposts/{username}", getuserposts).Methods("GET")
	r.HandleFunc("/getuserprofile/{username}", getuserprofile).Methods("GET")
	r.HandleFunc("/maillist/subscribe", subscribe).Methods("POST")
	r.HandleFunc("/adduser", adduser).Methods("POST")
	r.HandleFunc("/login", login).Methods("POST")
	r.HandleFunc("/authenticate", authenticate).Methods("GET")
	r.HandleFunc("/logout", logout).Methods("GET")
	http.ListenAndServe(":3000", handlers.CORS(headers, methods, origins)(r))

}
