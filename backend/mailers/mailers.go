package mailers

import (
	"gopkg.in/gomail.v2"
)
func Subscribemail(reciever string)(bool){
	mail:= gomail.NewMessage()
	mail.SetHeader("From", "kumarvadivel1999@gmail.com")
	mail.SetHeader("To", reciever)
	mail.SetHeader("Subject", "Subscription-csstricksclone.com")
	mail.SetBody("text/plain", "Thanks for subscribing to mailing list of csstricks-clone.com you will be recieving future messages regarding our updates")
	dialer := gomail.NewPlainDialer("smtp.gmail.com", 587, "kumarvadivel1999@gmail.com", "rnrqdrmzvckbkbzc")
	if e := dialer.DialAndSend(mail); e != nil {
		panic(e)
		//json.NewEncoder(response).Encode(e)
		return false
	}else{
		return true
	}
}
func Registermail(reciever string,firstname string,lastname string,username string)(bool){
	mail := gomail.NewMessage()
	mail.SetHeader("From", "kumarvadivel1999@gmail.com")
	mail.SetHeader("To", reciever)
	mail.SetHeader("Subject", "Registration Successfull-csstricksclone.com")
	mail.SetBody("text/plain", "Thanks  Mr./Ms."+firstname+" "+lastname+"(@"+username+") for joining the part of the family ..(csstricksclone) \n\n\n we at csstricksclone.com always make sure that your user expericence should not be compromised at any point of time.\n\n\n \nif you felt any bug in userexperience please report us immediately at \n\n\nreports@csstricksclone.com\n\n\nhappy blogging!!!\n\nWithRegards,\n\ncsstricksclone.com")
	dialer := gomail.NewPlainDialer("smtp.gmail.com", 587, "kumarvadivel1999@gmail.com", "rnrqdrmzvckbkbzc")
	if e := dialer.DialAndSend(mail); e != nil {
		panic(e)
		return true
	}else{
		return false
	}
}