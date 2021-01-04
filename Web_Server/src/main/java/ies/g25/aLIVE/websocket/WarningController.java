package ies.g25.aLIVE.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Controller
public class WarningController {

    @Autowired
    private SimpMessagingTemplate template;
    
    @MessageMapping("/chat")
    @SendTo("/healthstatus/messages")
    public String send(final String message){
        System.out.println("Sock sent");
        this.template.convertAndSend("/healthstatus/messages", message);
        return message;
    }
}
