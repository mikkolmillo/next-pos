const products = [
  {
    "id": 1,
    "title": "Caroma Geo soft close toilet seat replacement replaces 300034W",
    "price": 2,
    "source": "https://hotandcoldoutlet.com.au/wp-content/uploads/2019/01/geo-in-stock.jpg"
  },
  {
    "id": 2,
    "title": "Cover plate 74mm Matte Black",
    "price": 4,
    "source": "https://hotandcoldoutlet.com.au/wp-content/uploads/2021/11/74mm-black-flange-600x348.jpg"
  },
  {
    "id": 3,
    "title": "Contemporary Round Chopping Board",
    "price": 6,
    "source": "https://hotandcoldoutlet.com.au/wp-content/uploads/2018/08/42537_Capture.jpg"
  },
  {
    "id": 4,
    "title": "Board & Colander Set",
    "price": 8,
    "source": "https://hotandcoldoutlet.com.au/wp-content/uploads/2019/01/15010_MHBC_BK_Image_HeroImage_Clark_Half_Board_and_Colander_Set-600x600.jpg"
  },
  {
    "id": 5,
    "title": "Advance Timber Chopping Board",
    "price": 10,
    "source": "https://hotandcoldoutlet.com.au/wp-content/uploads/2018/05/14601_A2511_BK_Image_HeroImage_Clark_Advance_Timber_Chopping_Board_800px_800px-600x600.jpg"
  },
  {
    "id": 6,
    "title": "Prism Stainless Steel Drainer Tray",
    "price": 15,
    "source": "https://hotandcoldoutlet.com.au/wp-content/uploads/2018/05/28318_pA5016_BK_Image_HeroImage_150108_ori_1772px_1772px_2015Mar27163649_800px_800px-600x600.jpg"
  }
]

export default function userHandler (req, res) {
  const { method } = req

  switch (method) {
    case "GET":
      res.status(200).json(products)
      break;
  
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}