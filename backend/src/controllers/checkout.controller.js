import mercadopago from "mercadopago";

export const crearPreferencia = async (req, res) => {
  try {
    const token = process.env.MP_ACCESS_TOKEN;

    if (!token) {
      console.error("MP_ACCESS_TOKEN no definido");
      return res.status(500).json({ error: "Token de MercadoPago ausente" });
    }

    mercadopago.configure({
      access_token: token,
    });

    const productos = req.body.items;

    if (!Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({ error: "No se recibieron productos válidos" });
    }

    const items = productos.map((producto) => ({
      title: producto.nombre,
      quantity: Number(producto.cantidad),
      unit_price: Number(producto.precio),
      currency_id: "CLP",
    }));

    const preference = {
      items,
      back_urls: {
        success: "https://stellareindustries.vercel.app/orden-exitosa?status=approved",
        failure: "https://stellareindustries.vercel.app/error?status=failed",
        pending: "https://stellareindustries.vercel.app/error?status=pending"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ init_point: response.body.init_point });
  } catch (error) {
    console.error("Error al crear la preferencia:", error.message);
    res.status(500).json({ error: "No se pudo crear la preferencia" });
  }
};