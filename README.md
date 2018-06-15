# WebAuthn med MinID

W3C har nyleg sluppe ein [ny standard](https://www.w3.org/TR/webauthn/) for autentisering i browser basert på lokalt lagra nøklar som det står om i [denne artikkelen](https://www.digi.no/artikler/bred-enighet-om-standard-for-passordfri-webinnlogging/434587)

 
Standarden omhandlar korleis ein dings kan brukast som ein av autentiseringsfaktorane i ein IDP. "Knytt din apple watch til MinID", men erstatter ikkje utstedelse/onboarding-prosess.
 
Dificamp bør lage dette som ein frittståande IDP basert på eit fritt valgt produkt/rammeverk (shibboleth, identityserver, mitreeid) basert på OIDC-redirect flyt, og ikkje bruke sjølve MinID (openam) til dette, sidan det kan vere begrensa "djup" minid-kompetanse tilgjengleg i sumar. Mogelege deloppgåver:
 
1.  Etablere frittståande IDP med 2-faktor (keycloak, anna produkt..)
2.  Lage demo-tjeneste
3.  Erstatte ein av faktorane med WebAuthn
4.  Tjeneste for koble dings til IDP
5.  Tjeneste for å fjerne dings frå IDP
 
Målsetting: Oppgåva går ut på å sjå på korleis denne standarden kan utnyttast av MinID, først og fremst for å få ein betre brukaropplevelse, men ogso for å spare SMS-kostnadar. Resultata skal inn i haustens utredning av MinID-effektivisering.  


## Run the project
You need to install:
- Java 8
- Maven
- Keycloak

Start Keycloak on port 8080 and create a realm called KeycloakSpringBoot and a client called login-app. Only allow redirects to http://localhost:8081 in the client.

Run the Spring application and have fun at [http://localhost:8081](http://localhost:8081)
