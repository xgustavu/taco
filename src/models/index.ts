import mongoose from "mongoose";
const { Schema } = mongoose;

const GrupoSchema = new Schema({
    gru_id: { type: Number, required: true },
    gru_descricao: { type: String, maxlength: [50, "A descrição pode ter no máximo 50 caracteres"], required: true },
}, { timestamps: true },
);

const PreparacaoSchema = new Schema({
    pre_id: { type: Number, required: true },
    pre_descricao: { type: String, maxlength: [50, "A descrição pode ter no máximo 50 caracteres"], required: true },
}, { timestamps: true },
);

const ProdutoSchema = new Schema({
    grupo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grupo',
        required: true,
        validate: {
            validator: async function (id: string) {
                const grupo = await Grupo.findById(id); // verifica se id existe na coleção editoras
                return !!grupo; // true se a editora existir
            },
            message: 'O grupo fornecido não existe!',
        }
    },
    pro_id: { type: Number, required: true },
    pro_descricao: { type: String, maxlength: [100, "A descrição pode ter no máximo 100 caracteres"], required: true },
    pro_grupo: { type: Number, required: true },
}, { timestamps: true },
);

const ProdPrepSchema = new Schema({
    produtoAntigo_id:{type: Number, required: true},
    preparacaoAntiga_id: { type: Number, required: true }, // ID da preparação antiga
    preparacao_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Preparacao',
        required: true,
        validate: {
            validator: async function (id: string) {
                const grupo = await Preparacao.findById(id); // verifica se id existe na coleção editoras
                return !!grupo; // true se a editora existir
            },
        message: 'O grupo fornecido não existe!',
        }
    },
    produto_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Produto',
        required: true,
        validate: {
            validator: async function (id: string) {
                const grupo = await Produto.findById(id); // verifica se id existe na coleção editoras
                return !!grupo; // true se a editora existir
            },
            message: 'O grupo fornecido não existe!',
        }},      
    energia: { type: Number, required: false },
    proteina: { type: Number, required: false },
    lipidios: { type: Number, required: false },
    carboidratos: { type: Number, required: false },
    fibra: { type: Number, required: false },
    colesterol: { type: Number, required: false },
    agsaturado: { type: Number, required: false },
    agmono: { type: Number, required: false },
    agpoli: { type: Number, required: false },
    aglinoleico: { type: Number, required: false },
    aglinolenico: { type: Number, required: false },
    agtranstotal: { type: Number, required: false },
    acucartotal: { type: Number, required: false },
    acucaradicao: { type: Number, required: false },
    calcio: { type: Number, required: false },
    magnesio: { type: Number, required: false },
    manganes: { type: Number, required: false },
    fosforo: { type: Number, required: false },
    ferro: { type: Number, required: false },
    sodio: { type: Number, required: false },
    sodioadicao: { type: Number, required: false },
    potassio: { type: Number, required: false },
    cobre: { type: Number, required: false },
    zinco: { type: Number, required: false },
    selenio: { type: Number, required: false },
    retinol: { type: Number, required: false },
    vitamina_a: { type: Number, required: false },
    tiamina: { type: Number, required: false },
    riboflavina: { type: Number, required: false },
    niacina: { type: Number, required: false },
    niacina_ne: { type: Number, required: false },
    piridoxina: { type: Number, required: false },
    cobalamina: { type: Number, required: false },
    folato: { type: Number, required: false },
    vitamina_d: { type: Number, required: false },
    vitamina_e: { type: Number, required: false },
    vitamina_c: { type: Number, required: false },
},{ timestamps: true });

const Grupo = mongoose.model("Grupo", GrupoSchema);
const Preparacao = mongoose.model("Preparacao", PreparacaoSchema,"preparacoes");
const Produto = mongoose.model("Produto", ProdutoSchema);
const ProdPrep = mongoose.model('ProdPrep', ProdPrepSchema);

export { Grupo, Preparacao, Produto, ProdPrep};