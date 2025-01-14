const request = require('supertest');
const app = require('../src/app'); //

describe("Testes das Rotas da API", () => {

    it("Retorna um token se a credenciais de login forem validas", async () => {
        const response = await request(app).post('/auth/logar').send({
            email: "gabrielvieira040@outlook.com",
            password: "123456"
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });

    it("Retorna um erro se as credencias de login estiverem erradas", async () => {
        const response = await request(app).post('/auth/logar').send({
            email: "gabrielvieira040@outlook.com",
            password: "senhaerrada"
        });

        expect(response.status).toBe(501);
        expect(response.body).toHaveProperty("error", "Senha ou email incorreto");
    });


    it("Deve criar um laboratório com dados válidos", async () => {
        const response = await request(app).post('/laboratorio/novoLab').send({
            name: "Laboratório A",
            capacity: 30
        });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message", "Laboratório criado com sucesso!");
        expect(response.body.laboratorio).toHaveProperty("name", "Laboratório A");
    });

    it("Deve retornar erro ao criar laboratório com dados incompletos", async () => {
        const response = await request(app).post('/laboratorio/novoLab').send({
            name: "Laboratório B"
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error", "Necessario nome e capacidade");
    });


    it("Deve gerar um relatório de laboratórios em PDF", async () => {
        const response = await request(app).get('/laboratorio/relatorio');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('application/pdf');
    });
});
