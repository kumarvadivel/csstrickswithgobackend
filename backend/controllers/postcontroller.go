package controllers
import (
	"time"
	"log"
	"encoding/json"
	"context"
	"../models"
	"strconv"
	"github.com/gorilla/mux"
	"fmt"
	"net/http"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)
func Getuserprofile(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(request)
	username := vars["username"]
	
	var user models.User
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
func Deletepost(response http.ResponseWriter, request *http.Request) {
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
func Updatepost(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var post models.Post
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
func Getpostfilter(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(request)
	filter := vars["posttype"]
	collection := client.Database("csstricks").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	filtercursor, err := collection.Find(ctx, bson.M{"articlemeta": filter})
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
func Getuserposts(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	vars := mux.Vars(request)
	username := vars["username"]
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
func Getpost(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var post models.Post
	collection := client.Database("csstricks").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 30*time.Second)
	err := collection.FindOne(ctx, models.Post{ID: id}).Decode(&post)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(post)
}
func Getposts(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	var posti []models.Post
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
		var post models.Post
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
func Addpost(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	response.Header().Set("Access-Control-Allow-Credentials", "true")
	var post models.Post
	json.NewDecoder(request.Body).Decode(&post)
	postcollection := client.Database("csstricks").Collection("posts")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := postcollection.InsertOne(ctx, post)
	json.NewEncoder(response).Encode(result)
}
func Bulkpost(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("content-type", "application/json")
	response.Header().Set("Access-Control-Allow-Credentials", "true")
	var data []models.Post
	json.NewDecoder(request.Body).Decode(&data)
	for i := 0; i < len(data); i++ {
		postcollection := client.Database("csstricks").Collection("posts")
		ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
		result, _ := postcollection.InsertOne(ctx, data[i])
		fmt.Println(result)
	}
	json.NewEncoder(response).Encode(strconv.Itoa(len(data)) + " posts added successfully")
}
