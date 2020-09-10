package models

import (
	
	"go.mongodb.org/mongo-driver/bson/primitive"
)
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
type Authstatus struct {
	Username             string `json:"username"`
	Firstname            string `json:"firstname"`
	Lastname             string `json:"lastname"`
	Authenticationstatus bool   `json:"Authenticationstatus"`
}

type Mailing struct {
	Email string `json:"email,omitempty" bson:"email,omitempty"`
}

type ResponseResult struct {
	Error  string `json:"error"`
	Result string `json:"result"`
}