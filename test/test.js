const chai = require('chai');
const chaiHttp = require('chai-http');

//const should = chai.should();
chai.use(chaiHttp);

const url = "https://localhost:6000"

const clientTemplate = () => {
    return {
        clientID: `${Math.ceil(Math.random() * 1000)}`,
        firstName: 'CLIENT',
        lastName: 'TEST',
        streetAddress: 'FASANVEJ',
        City: 'København',
    };
};

describe("Testing Clients REQUEST", ()=>{
    
    describe("/GET empty clients", () => {
        it("it should GET all the clients", (done) => {
          chai
            .request(url)
            .get("/clients")
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("array");
              clientsLength = res.body.length;
              //   res.body.length.should.be.eql(0);
              done();
            });
        });
    });
})