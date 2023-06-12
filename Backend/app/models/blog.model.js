module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        userId:String,
        description: String,
        content:String,
        author:String,
        published: Boolean,
        image1:String,
        image2:String,
        
      },
      { timestamps: true },
  
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Tutorial = mongoose.model("blog", schema);
    return Tutorial;
  };
  