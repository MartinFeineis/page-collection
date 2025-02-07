FROM node:18
RUN git clone https://github.com/MartinFeineis/page-collection.git 
WORKDIR /page-collection
COPY .env .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev"]
