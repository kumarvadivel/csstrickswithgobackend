package main

import (
	"fmt"
	"net/http"
	

	"./middlewares"
	"./controllers"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	
	
)
func main() {
	fmt.Println("Starting the application...")
	r := mux.NewRouter()
	r.Use(middlewares.AuthenticationMiddleware)
	headers := handlers.AllowedHeaders([]string{"X-Requested-with", "Content-Type", "Authorisation"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:4200"})
	r.HandleFunc("/addpost", controllers.Addpost).Methods("POST")
	r.HandleFunc("/addbulkpost", controllers.Bulkpost).Methods("POST")
	r.HandleFunc("/getposts", controllers.Getposts).Methods("GET")
	r.HandleFunc("/getposts/{id}", controllers.Getpost).Methods("GET")
	r.HandleFunc("/getposts/filter/{posttype}", controllers.Getpostfilter).Methods("GET")
	r.HandleFunc("/getposts/{id}/update", controllers.Updatepost).Methods("PUT")
	r.HandleFunc("/getposts/{id}/delete", controllers.Deletepost).Methods("DELETE")
	r.HandleFunc("/getuserposts/{username}", controllers.Getuserposts).Methods("GET")
	r.HandleFunc("/getuserprofile/{username}", controllers.Getuserprofile).Methods("GET")
	r.HandleFunc("/maillist/subscribe", controllers.Subscribe).Methods("POST")
	r.HandleFunc("/adduser", controllers.Adduser).Methods("POST")
	r.HandleFunc("/login", controllers.Login).Methods("POST")
	r.HandleFunc("/authenticate", controllers.Authenticate).Methods("GET")
	r.HandleFunc("/logout", controllers.Logout).Methods("GET")
	http.ListenAndServe(":3000", handlers.CORS(headers, methods, origins)(r))

}
