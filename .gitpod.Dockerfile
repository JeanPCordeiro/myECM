FROM gitpod/workspace-full

RUN sudo apt update -y
RUN sudo apt install -y awscli

RUN wget https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-linux-x86_64.zip
RUN unzip aws-sam-cli-linux-x86_64.zip -d sam-installation
RUN sudo ./sam-installation/install

RUN pip3 install checkov
RUN npm i -g @humanmade/cf-to-tf
RUN pip install cfn-lint

RUN brew install tfsec
