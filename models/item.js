class Item {
  constructor(data = {}) {
    this.id = data.id ?? null;
    this.name = data.name ?? "untitled";
    this.details = data.details ?? "None";
    this.amount = Number(data.amount) ?? 0;
    this.price = Number(data.price ?? 99.9);
    this.categoryId = Number(data.categoryId) ?? 1;
    this.imageUrl = data.imageUrl ?? null;
  }

  static fromDb(row) {
    return new Item({
      id: row.id,
      name: row.name,
      details: row.details,
      amount: row.amount,
      price: row.price,
      categoryId: row.category_id,
      imageUrl: row.image_url,
    });
  }

  static fromForm(body, file) {
    return new Item({
      ...body,
      imageUrl: file ? `/uploads/${file.filename}` : null,
      categoryId: 1,
    });
  }

  toDbObject() {
    return {
      id: this.id,
      name: this.name,
      details: this.details,
      amount: this.amount,
      price: this.price,
      category_id: this.categoryId,
      image_url: this.imageUrl,
    };
  }
}

module.exports = Item;
