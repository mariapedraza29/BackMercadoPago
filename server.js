import express from "express";
import cors from "cors";

import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
	accessToken : "TEST-5873517697339903-030613-0fc63bbe781a90b3070f0e229204c5e5-1708226957",
});
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())

app.get("/", (req,res) => {
    res.send("el servidor de mercadopago funciona")
});

app.post("/create_preference",async (req, res) => {
try{
	const body = {
		items: [
			{
				title: req.body.title,
				quantity: Number(req.body.quantity),
				unit_price: Number(req.body.price),
				currency_id: "COP"
			},
		],
		back_urls: {
			success: "https://img.freepik.com/vector-premium/proceso-mantenimiento-fue-exitoso_18660-4063.jpg",
			failure: "https://static.vecteezy.com/system/resources/previews/009/651/765/non_2x/error-in-process-operation-icon-vector.jpg",
			pending: "https://www.shutterstock.com/image-vector/pending-payment-abstract-concept-vector-260nw-2282508245.jpg"
		},
		auto_return: "approved",
	};

	const preference = new Preference(client);
	const result = await preference.create({body});
	res.json({
		id:result.id,
	});

	}catch(error){
		console.log(error);
		res.status(500).json({
			error: "Error al crear la preferencia"
		});
	}
});

app.listen(port, () => {
	console.log(`The server is now running on Port ${port}`);
});