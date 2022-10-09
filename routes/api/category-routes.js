const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ]
    });

    const catetories = categoryData.map((catetories) => catetories.get({ plain: true }));
    res.json(catetories);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ]
    });

    const categories = categoryData.get({ plain: true });
    res.json(categories);

  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const caterogyData = await Category.create(req.body);
    res.status(200).json(caterogyData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    res.status(200).json("Category Updated");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try{
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if(!categoryData) {
      res.status(404).json({ message: "No product with this id"});
      return;
    }
    res.status(200).json({ message: "Product deleted" });
  }catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
