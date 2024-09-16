![alt text](figures/logo_Enershare.png)

Welcome to INESC TEC Renewable Energy Community (REC) Sizing and Operation Guided User Interface (GUI).

This GUI is intended for end-users who wish to interact with the 
**REC Sizing REST API** (https://github.com/INESCTEC/rec-sizing-rest-api) and the 
**REC Operation REST API** (https://github.com/INESCTEC/rec-operation-rest-api) 
in a more intuitive and ready-to-use platform. 
This development was made under the *Enershare* project.


> **_NOTE:_** The deployment of this GUI requires the deployment of the REC Sizing 
> and REC Operation REST APIs on the same server. In order to do so, please address 
> the instructions provided on the respective GitHub repositories of both APIs.


## Developers // Contacts:

* Adriano Novo Maior (adriano.n.maior@inesctec.pt)
* Ricardo Silva (ricardo.emanuel@inesctec.pt)

## Run Development server
Run `npm install` to install modules

Run `npm run dev` for dev server

The interface should now be available [here](http://localhost:5173/login).

## Update API URLs
To update the API URLs go to [/src/Main/Interface.jsx](https://gitlab.inesctec.pt/cpes/european-projects/enershare/enershare-ui/-/blob/main/src/Main/Interface.jsx) and change the dictionary values to the corresponding URLs.

## Example results only
Currently only working with temporary data.

Search Meters on this version only changes the meter origin for the meters shown.

To get example results submit the forms without selecting any meter on the `Meter Selection` section.