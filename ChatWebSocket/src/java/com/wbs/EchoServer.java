/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.wbs;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;

/**
 *
 * @author josepplloo
 */
@ServerEndpoint("/echo")
public class EchoServer {
    private static final Set<Session> peers=
            Collections.synchronizedSet(new HashSet<Session>());

//cargamos el peer en el cojunto de sesiones
    
    @OnOpen
    public void onOpen(Session peer){
    peers.add(peer);
    }

    @OnMessage
    public void onMessage(String message, Session client) throws IOException, EncodeException {
        for(Session peer:peers){
        peer.getBasicRemote().sendObject(message);
        }
        
    }
    
    @OnClose
    public void onClose(Session peer){
    peers.remove(peer);
    }
    
}
