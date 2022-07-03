---
id: vizualisation
title: Visualization
sidebar_label: Visualization
---


## Présentation
**Classe python pour la création des resossources necessaires pour la partie visualisation** </p>
**Permet de créer des dashboars pour un suivi à temps réel de l'API deployée**


```express
class Visualization:
    def __init__(self,
                 bucket : str,
                 auth_object,
                 api_name: str,
                 region = "us-west-1")
```
## Paramètres 
* **bucket** : type : str
    * Nom du bucket S3 
* **auth_object** : type : UserAwsAuth
    * Objet contenant les informations sur le User AWS à utiliser pour la création des ressources
* **api_name** : type : str
    * Le nom de l'API déployée auparavant. Ce nom est unique (un nouveau id unique est généré à chaque exécution)
* **region** : type : str
    * Le nom de la région dans laquelle sont créées les ressources AWS, pour plus d'informations sur les régions disponibles sur AWS, veuillez consulter le lien suivant : https://aws.amazon.com/fr/about-aws/global-infrastructure/regions_az/
    * Valeur par default : us-west-1"


## Ressources
* La classe Visualization crée les ressources suivantes sur le compte aws de l'utilisateur :
    * Pile CloudFomation
    * Roles IAM
    * Dashboards CloudWatch
* Offre plusieurs méthodes de classe suivantes:
    * prepare_env()
    * create_stack()
    * get_clf_stack_status()
    * visualize()

## Fonctions 

### easyTDV.Visualization.prepare_env()
#### Présentation : 
* Une fonction qui charge les fichiers suivants vers S3 :
    * **stack_template.json :** template CloudFormation pour les ressources de visualisation;

#### Returns : dict {url_s3_stack_template}
* **url_s3_stack_template :** url s3 vers le fichier stack_template.json
* Génère une exception en cas d'échec de chargement du fichier vers s3

### easyTDV.Visualization.create_stack(prepare_env_response, invoke_mode=[0, 1])
#### Présentation : 
* Une méthode de la classe Visualization permettant de créer une pile CloudFormation pour l'automatisation de la création des ressources pour la partie Visualisazion.
#### Paramètres : 
* **prepare_env_response** 
    Correspond à l'objet renvoyé par la méthode de class prepare_env()
   
        {
            dict{url_s3_stack_template : str} 
        }

* **invoke_mode** : type : int 
    * Correspond aux modes d'invocations de la méthode, prend les valeurs suivantes :    
        - 0: synchrone
        - 1: asynchrone


#### Returns : dict
* mode synchrone:
    * stack_id : type : str 
        * ID unique de la pile CloudFormation de deploiement
    * stack_name : type : str  
        * Nom unique de la pile CloudFormation de deploiement
* mode asynchrone: 
    * le statut de création de la pile CloudFormation de deploiement
* génère une exception en cas d'échec de création de la pile CloudFormation   

### easyTDV.Visualization.get_clf_stack_status(stack_name)
#### Présentation : 
* Une méthode de classe Visualization permettant d'obtenir le statut de création de la pile CloudFormation. 
#### Paramètres : 
* **stack_name** : Nom unique de la pile CloudFormation

#### Returns : str
* le statut de la pile CloudFormation de deploiement.
* génère une exception en cas d'échec de création de la pile CloudFormation.

### easyTDV.Visualization.vizualise(prepare_env_response, invoke_mode=[0,1])
#### Présentation : 
* Une méthode de la classe Visualization permettant de lancer la pile CloudFormation de la partie visualization.
#### Paramètres : 
* **prepare_env_response**  
    Correspond à l'objet renvoyé par la méthode de class prepare_env()
    
        {
            dict{url_s3_stack_template : str} 
        }

* **invoke_mode** : type : int 
    * Correspond aux modes d'invocations de la méthode, prend les valeurs suivantes :    
        - 0: synchrone
        - 1: asynchrone
#### Returns : str 
* Nom unique pour le dashboard de visualisation


### easyTDV.Visualization.delete_resources():
#### Présentation : 
* Supprime la stack CloudFormation à la fin du process. Toute les ressources créées pour cette partie seront suppriméées autimatiquement.

#### Returns : None
