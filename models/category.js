class Category {
  constructor(data = {}) {
    this.id = data.id ?? null;
    this.name = data.name ?? "Untitled category";
    this.imageUrl = data.imageUrl ?? null;
  }

  static fromDb(row) {
    return new Category({
      id: row.id,
      name: row.name,
      imageUrl: row.image_url,
    });
  }

  static fromForm(body, file) {
    return new Category({
      ...body,
      imageUrl: file ? `/uploads/${file.filename}` : null,
    });
  }

  toDbObject() {
    return {
      id: this.id,
      name: this.name,
      image_url: this.imageUrl,
    };
  }
}

module.exports = Category;
