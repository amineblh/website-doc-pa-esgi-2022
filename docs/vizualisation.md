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
                 template_stack_local_path: str,
                 auth_object,
                 api_name: str,
                 region = "us-west-1"):
        self.bucket = bucket
        self.job_id = generate_job_id()
        self.template_stack_local_path = template_stack_local_path
        self.region = region
        self.access_key_id = auth_object.secret_key_id
        self.secret_access_key = auth_object.secret_access_key
        self.nomenclature_object = VisualizationNomenclature(self.job_id, self.bucket, self.region)
        self.api_name = api_name
```

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
#### Présenatation : 
* Une fonction qui charge les fichiers suivants vers S3 :
    * **stack_template.json :** template CloudFormation pour les ressources de visualisation;

#### Returns : dict {url_s3_stack_template}
* **url_s3_stack_template :** url s3 vers le fichier stack_template.json
* Génère une exception en cas d'échec de chargement du fichier vers s3

### easyTDV.Visualization.create_stack(prepare_env_response, invoke_mode=[0, 1])
#### Présenatation : 
    à completer
#### Paramètres : 
* **prepare_env_response** 
    Correspond à l'objet renvoyé par la méthode de class prepare_env()
   
        {
            dict{url_s3_stack_template : str} 
        }

* **invoke_mode** :  correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
    - 0: synchrone
    - 1: asynchrone


#### Returns : dict
* mode sysnchrone:
    * stack_id : ID unique de la pile CloudFormation de visualisation
    * stack_name : Nom unique de la pile CloudFormation de visualisation
* mode asynchrone:
    * le statut de création de la pile CloudFormation de visualisation
* génère une exception en cas d'échec de création de la pile CloudFormation   

### easyTDV.Visualization.get_clf_stack_status(stack_name)
#### Présenatation : 
    a completer
#### Paramètres : 
* **stack_name** : Nom unique de la pile CloudFormation

#### Returns : str
* le statut de la pile CloudFormation de deploiement.
* génère une exception en cas d'échec de création de la pile CloudFormation.

### easyTDV.Visualization.vizualise(prepare_env_response, invoke_mode=[0,1])
#### Présenatation : 
    a completer
#### Paramètres : 
* **prepare_env_response**  
    Correspond à l'objet renvoyé par la méthode de class prepare_env()
    
        {
            dict{url_s3_stack_template : str} 
        }

* **invoke_mode** :  correspond aux modes d'invocations de la méthode, prend les valeurs suivantes : 
    
    - 0: synchrone
    - 1: asynchrone
#### Returns : str 
* Nome unique pour le dashboard de visualisation