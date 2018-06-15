package no.difi.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class MainController {

    @GetMapping(path="/")
    public String index() {
        return "external";
    }

    @GetMapping(path="/customers")
    public String customers(Principal principal, Model model) {
        addCustomers();
        model.addAttribute("customers", "customers");
        model.addAttribute("username", principal.getName());
        return "customers";
    }

    public void addCustomers() {
    }

}
