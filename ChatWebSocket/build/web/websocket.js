/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var wsUri ="ws://"+document.location.host +document.location.pathname+ "echo";
var websocket= new WebSocket(wsUri);
var username;

websocket.onopen=function(evt){
  onOpen(evt);  
};
websocket.onmessage=function(evt){
  onMessage(evt);  
};
websocket.onerror=function(evt){
  onError(evt);  
};

var output= document.getElementById("output");

function join(){
  username=textField.value;
  websocket.send(username+ " enlazado");
};

function send_message(){
   websocket.send(username + ": " + textField.value);
}

function onOpen(){
    writeToScreen("Conectado a: " + wsUri);
}

function onMessage(evt){
    console.log("onMessage");
    writeToScreen("RECIEVED: " + evt.data);
    if (evt.data.indexOf("enlazado")!=-1){
        userField.innerHTML+=evt.data.substring(0,evt.data.indexOf("enlazado"))+ "\n";
    }else{
        chatLogField.innerHTML+=evt.data + "\n";
    }
}

function onError(evt){
    writeToScreen('<span style="color:red;">ERROR:' + evt.data +"</span>'");
}

function writeToScreen(message){
    output.innerHTML+=message+"<br>";
    
}


