package middlewares



import (
	"net/http"
	"../models"
	"fmt"
	"encoding/json"
	"github.com/dgrijalva/jwt-go"
	
)


func AuthenticationMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(response http.ResponseWriter, request *http.Request) {
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
				next.ServeHTTP(response, request)
				return
			} else {
				res.Error = err.Error()
				json.NewEncoder(response).Encode(res)
				return
			}
		}
	}
		
	})

}