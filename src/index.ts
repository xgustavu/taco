import connect from "./models/connection";
import { Grupo, Preparacao, ProdPrep, Produto } from "./models"; // importação dos modelos
import fs from 'fs';
import readline from 'node:readline';

// conecta ao MongoDB no início da aplicação
connect();

// Parte 01

// importando tabela grupo
// var rl = readline.createInterface({
//     input: fs.createReadStream('./src/Taco-Grupo.csv'),
//     output: process.stdout,
//     terminal: false
// }) // cria a interface para leitura do arquivo assyncrona

// let x: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

// rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
//     if (x > 0) { // só processa se não for a primeira linha
//         var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
//         console.log(l);
//         var grupo = new Grupo({ // criar um objeto Schema Grupo e popula seus campos/colunas
//             gru_id: l[0],
//             gru_descricao: l[1],
//         });
//         grupo.save(); // salva o objeto no BD
//     }
//     x++; // incrementa a varíavel de controle de linha
// })

// rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO

// // importando tabela preparacao
// var rl = readline.createInterface({
//     input: fs.createReadStream('./src/Taco-Preparacao.csv'),
//     output: process.stdout,
//     terminal: false
// }) // cria a interface para leitura do arquivo assyncrona

// let y: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

// rl.on('line', function (linha: any) { // função que lê linha a linha do arquivo e as colaca na variável linha
//     if (y > 0) { // só processa se não for a primeira linha
//         var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
//         console.log(l);
//         var preparacao = new Preparacao({ // criar um objeto Schema Preparacao e popula seus campos/colunas
//             pre_id: l[0],
//             pre_descricao: l[1],
//         });
//         preparacao.save(); // salva o objeto no BD
//     }
//     y++; // incrementa a varíavel de controle de linha
// })

// rl.close; // fecha a função rl para o arquivo não constar como aberto pelo SO

// importando tabela produtos

//Partee 02

// const data = fs.readFileSync('./src/Taco-Produto.csv',
//     { encoding: 'utf8', flag: 'r' }).toString().split("\r\n"); // lê e fecha o arquivo CSV de Produtos, 
//                                                               // colocando os dados na variável data linha a linha

// let w: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

// data.forEach(async linha => { // faz a leitura de cada linha da variável data
//     if (w > 0) { // só processa se não for a primeira linha
//         var l = linha.split(';'); // quebra a linha nos pontos-e-vírgula gerando um array com cada campo/coluna
// //        console.log(l);
//         var doc = await Grupo.findOne({ gru_id: l[2] }).exec(); // busca o grupo específico na coleção Grupo através do ID original
// //        console.log(doc);
//         if (doc != null) { // processa apenas caso tenha encontrado o documento
//             var produto = new Produto({ // criar um objeto Schema Produto e popula seus campos/colunas
//                 grupo: doc._id, // aloca o _id gerado pelo Mongoose na coleção Grupo
//                 pro_id: l[0],
//                 pro_descricao: l[1],
//                 pro_grupo: l[2]
//             });
//             produto.save(); // salva o objeto no BD
//         }
//     }
//     w++; // incrementa a varíavel de controle de linha
// }); // fecha data.forEach

// Parte 03 - Importando tabela ProdPrep
// Configurando o readline para leitura do arquivo CSV
var rl = readline.createInterface({
    input: fs.createReadStream('./src/Taco-ProdPrep.csv'),
    output: process.stdout,
    terminal: false
});

let z: number = 0; // variável necessária para pular a primeira linha de cabeçalho do arquivo CSV

rl.on('line', async function (linha: any) {
    if (z > 0) {
        try {
            var l = linha.split(';');
            // console.log(`Linha do goleiro bruno ${z + 1}:`, l); // Para verificar o que está sendo lido
            // console.log(`Linha do goleiro EDUARDOOOO ${(l[2])}:`); // Para verificar o que está sendo lido

            // Verificando se pre_id está disponível
            if (!l[1]) {
                console.error(`Linha ${z + 1}: pre_id não encontrado ou é nulo.`);
                return;
            }

            // Buscando a Preparação pelo ID
            const preparacaoDoc = await Preparacao.findOne({ pre_id: Number(l[1]) }).exec();
            if (!preparacaoDoc) {
                console.error(`Preparação com ID ${l[1]} não encontrada.`);
                return;
            }

            // Buscando o Produto pelo ID
            const produtoDoc = await Produto.findOne({ pro_id: Number(l[0]) }).exec();
            if (!produtoDoc) {
                console.error(`Produto com ID ${l[0]} não encontrado.`);
                return;
            }

           const parseNumber = (value: string) => {
            // Remove espaços em branco e substitui vírgulas por pontos
            const sanitizedValue = value.trim().replace(',', '.');
            const numberValue = Number(sanitizedValue);

            // Log para ver a conversão
            // console.log(`Converting value: '${value}' to number: ${numberValue}`);

            return !isNaN(numberValue) ? numberValue : 0; // Retorna 0 se não for um número
        };

        // Dentro do loop, ao criar o objeto ProdPrep
        var prodPrep = new ProdPrep({
            produtoAntigo_id: Number(l[0]),
            preparacaoAntiga_id: Number(l[1]),
            preparacao_id: preparacaoDoc._id,
            produto_id: produtoDoc._id,
            energia: parseNumber(l[2]),
            proteina: parseNumber(l[3]),
            lipidios: parseNumber(l[4]),
            carboidratos: parseNumber(l[5]),
            fibra: parseNumber(l[6]),
            colesterol: parseNumber(l[7]),
            agsaturado: parseNumber(l[8]),
            agmono: parseNumber(l[9]),
            agpoli: parseNumber(l[10]),
            aglinoleico: parseNumber(l[11]),
            aglinolenico: parseNumber(l[12]),
            agtranstotal: parseNumber(l[13]),
            acucartotal: parseNumber(l[14]),
            acucaradicao: parseNumber(l[15]),
            calcio: parseNumber(l[16]),
            magnesio: parseNumber(l[17]),
            manganes: parseNumber(l[18]),
            fosforo: parseNumber(l[19]),
            ferro: parseNumber(l[20]),
            sodio: parseNumber(l[21]),
            sodioadicao: parseNumber(l[22]),
            potassio: parseNumber(l[23]),
            cobre: parseNumber(l[24]),
            zinco: parseNumber(l[25]),
            selenio: parseNumber(l[26]),
            retinol: parseNumber(l[27]),
            vitamina_a: parseNumber(l[28]),
            tiamina: parseNumber(l[29]),
            riboflavina: parseNumber(l[30]),
            niacina: parseNumber(l[31]),
            niacina_ne: parseNumber(l[32]),
            piridoxina: parseNumber(l[33]),
            cobalamina: parseNumber(l[34]),
            folato: parseNumber(l[35]),
            vitamina_d: parseNumber(l[36]),
            vitamina_e: parseNumber(l[37]),
            vitamina_c: parseNumber(l[38]),
        });


            // console.log('ProdPrep que será salvo:', JSON.ify(prodPrep, null, 2)); // Exibindo objeto a ser salvo

            await prodPrep.save();
            // console.log('ProdPrep salvo com sucesso:', prodPrep);

        } catch (error) {
            // Verificando se error é uma instância de Error
            if (error instanceof Error) {
                console.error(`Erro na linha ${z + 1}: ${error.message}`);
            } else {
                console.error(`Erro desconhecido na linha ${z + 1}:`, error);
            }
        }
    }
    z++;
});
