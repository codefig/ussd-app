const app = require('express')()
const bodyParser = require('body-parser')
const logger = require('morgan')

const port = process.env.PORT || 3030

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('*', (req, res) => {
  res.send('Welcome to the Emergency Operation Unit, how can we help you ?')
})

app.post('*', (req, res) => {
  let {sessionId, serviceCode, phoneNumber, text} = req.body
  let name = "";
  let address = "";
  let details = "";
  let textValue = text.split('*').length;
  if(text === ''){
    message = "Welcome to the Emergency center, how can we help you"
   }else if(textValue === 1){
    message = "CON What do you want to eat?"
    orderDetails.name = text;
}else if(textValue === 2){
    message = "CON Where do we deliver it?"
    orderDetails.description = text.split('*')[1];
}else if(textValue === 3){
    message = "CON What's your telephone number?"
    orderDetails.address = text.split('*')[2];
}else if(textValue === 4){
    message = `CON Would you like to place this order?
    1. Yes
    2. No`
    lastData = text.split('*')[3];
}else{
    message = `END Thanks for your order
    Enjoy your meal in advance`
    orderDetails.telephone = lastData   
}
  res.send(message);
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})