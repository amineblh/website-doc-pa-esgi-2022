const React = require('react');

const { Container, GridBlock } = require('../../core/CompLibrary.js');

class HomeSplash extends React.Component {
	render() {
		const {siteConfig, language = ''} = this.props;
		const {baseUrl, docsUrl} = siteConfig;
		const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
		const langPart = `${language ? `${language}/` : ''}`;
		const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

		const SplashContainer = props => (
				<div className='homeContainer'>
					<div className='homeSplashFade'>
						<div className='wrapper homeWrapper'>{props.children}</div>
					</div>
				</div>
		);

		const ProjectTitle = () => (
			<h2 className="projectTitle">
				<img src={`${baseUrl}img/logo3.png`} />
				<small>{siteConfig.tagline}</small>
				<small>{siteConfig.toto}</small>
			</h2>
		);

		const PromoSection = props => (
			<div className="section promoSection">
				<div className="promoRow">
					<div className="pluginRowBlock">{props.children}</div>
				</div>
			</div>
		);

		const Button = props => (
			<div className="pluginWrapper buttonWrapper">
				<a className="button" href={props.href} target={props.target}>
					{props.children}
				</a>
			</div>
		);

		return (
			<SplashContainer>
				<div className="inner">
					<ProjectTitle siteConfig={siteConfig} />
					<PromoSection>
						<Button href="#install">Installation</Button>
						<Button href={docUrl("start", language)}>Get Started</Button>
						<Button href={docUrl("presentation", language)}>Documentation</Button>
					</PromoSection>
				</div>
			</SplashContainer>
		);
	}
}

class Index extends React.Component {
	render() {
		const { config: siteConfig, language = '' } = this.props;
		const { baseUrl } = siteConfig;

		const server = `
\`\`\`express
from easyTDV import UserAwsAuth as Ath
from easyTDV import Train as T
from easyTDV import Deploy as D
from easyTDV import Vizualisation as V

def prepro_fn(input_model):
    import numpy as np
    age = float(input_model["age"])
    sex = float(input_model["sex"])
    return np.array([age, sex]).reshape(-1, 2)

if __name__ == "__main__":
    bucket = "test-pa-esgi-02072022"
    device_size = "2"
    instance_type = "t2.medium"
    model_s3_key = "domaine=model/modelPKL"

    local_rep = "."
    train_script_local_path = f"{local_rep}/trainscript.py"
    requirements_local_path = f"{local_rep}/requirements.txt"

    credential_file_path = r"C:\Users\IAM\new_user_credentials.csv"
    auth_object = Ath.UserAwsAuth(credential_file_path)
    auth_object.describe()

     # Partie entrainement

    print("===============================>[Train]<===============================")
    train_object = T.Train(bucket, auth_object, train_script_local_path,
                        requirements_local_path, instance_type, device_size)

    prep_env_response = train_object.prepare_env()

    create_stack_status = train_object.create_clf_stack(prep_env_response)

    instance_id = train_object.lunch_train_ec2()

    install_req_status = train_object.install_requerments(instance_id)

    if install_req_status["status"]=="Success":
        train_status = train_object.lunch_train_script(instance_id)
        if train_status["status"] == "Success":
            print("\n========>train finished!")

    train_object.delete_resources(instance_id)

    # Partie Deploiement

    print("===============================>[Deployment]<===============================")

    workdir = "."

    DeployObject = D.Deploy(bucket, model_s3_key, prepro_fn, auth_object,workdir)

    print("[Deployment] prepare_env...")
    deployment_prepare_env = DeployObject.prepare_deployment()

    print("[Deployment] deploy...")
    api_response = DeployObject.deploy(deployment_prepare_env)

    print(api_response)

    api_name = api_response["api_name"]

    print("===============================>[Vizualisation]<===============================")
    VizObject = V.Vizualisation(bucket, auth_object, api_name)

    vizualisation_prepare_env = VizObject.prepare_env()

    dashboard_name = VizObject.vizualise(vizualisation_prepare_env)

    print(dashboard_name)


\`\`\`
		`;

		const Block = props => (
			<Container
				padding={["bottom", "top"]}
				id={props.id}
				background={props.background}>
				<GridBlock
					align={props.align}
					contents={props.children}
					layout={props.layout}
				/>
			'</Container>
		);

		const Features = () => (
			<Block align="center" background="light" layout="threeColumn">
			{[
				{
					content: '',
					image: `${baseUrl}img/science.jfif`,
					imageAlign: 'top',
					title: 'Data Science',
				},
				{
					content: '',
					image: `${baseUrl}img/IA.jfif`,
					imageAlign: 'top',
					title: 'Artificial Intelligence',
				},			
				{
					content: '',
					image: `${baseUrl}img/ML.jfif`,
					imageAlign: 'top',
					title: 'Machine Learning',
				},
				{
					content: '',
					image: `${baseUrl}img/API.jfif`,
					imageAlign: 'top',
					title: 'API REST',
				},
				{
					content: '',
					image: `${baseUrl}img/th.jfif`,
					imageAlign: 'top',
					title: 'Amazon Web Services',
				},
				{
					content: '',
					image: `${baseUrl}img/cloudwatch.jfif`,
					imageAlign: 'top',
					title: 'CloudWatch',
				},
				{
					content: '',
					image: `${baseUrl}img/VM.jfif`,
					imageAlign: 'top',
					title: 'Virtual machine',
				},
				{
					content: '',
					image: `${baseUrl}img/lambda.jfif`,
					imageAlign: 'top',
					title: 'AWS Lambda',
				},
			
			]}
			</Block>
		);

		const Installation = () => (
			<Block id="install">
				{[
					{
						content: 'Install latest easyTDV version 1.2.0 by running the following command:\n\n`pip install easyTDV==1.6.6`',
						image: `${baseUrl}img/command-line.svg`,
						imageAlign: 'left',
						title: 'Installation',
					},
				]}
			</Block>
		);

		const TryNow = () => (
			<Block background="light" id="try">
				{[
					{
						content: `Train, Deploy and Visualize your own AI model in AWS cloud just by using few lines of code:\n\n${server}`,
						image: `${baseUrl}img/python.jfif`,
						imageAlign: 'right',
						title: 'Try now!',
					},
				]}
			</Block>
		);

		const LearnHow = () => (
			<Block>
				{[
					{
						content: 'Read docs, follow tutorial, create apps!',
						image: `${baseUrl}img/learn.svg`,
						imageAlign: 'left',
						title: 'Learn How',
					},
				]},
			</Block>
		);

		return (
			<div>
				<HomeSplash siteConfig={siteConfig} language={language} />
				<div className="mainContainer">
					<Features />
					<Installation />
					<TryNow />
					<LearnHow />
				</div>
			</div>
		);
	}
}

module.exports = Index;