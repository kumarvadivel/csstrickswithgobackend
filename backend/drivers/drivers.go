package drivers

import (

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"context"
	"time"

)

func Dbconnection()(*mongo.Client){
	
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	clientOptions := options.Client().ApplyURI("mongodb+srv://kumar:1721175@cluster0.lxafx.mongodb.net/csstricks?retryWrites=true&w=majority")
	var client *mongo.Client;
    client,_= mongo.Connect(ctx, clientOptions)
	return client
}
func GetDBCollection() (*mongo.Collection, error) {
	clientOptions := options.Client().ApplyURI("mongodb+srv://kumar:1721175@cluster0.lxafx.mongodb.net/csstricks?retryWrites=true&w=majority")
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		return nil, err
	}
	err = client.Ping(context.TODO(), nil)
	if err != nil {
		return nil, err
	}
	collection := client.Database("csstricks").Collection("users")
	return collection, nil
}