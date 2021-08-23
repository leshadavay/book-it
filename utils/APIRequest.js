class APIRequest {
  constructor(run, query) {
    this.run = run;
    this.query = query;
  }
  search() {
    const location = this.query.location
      ? {
          address: {
            $regex: this.query.location,
            $options: "i",
          },
        }
      : {};
    this.run = this.run.find({ ...location });
    return this;
  }
  filter() {
    const queryFilter = { ...this.query };

    //remove location from url param
    delete queryFilter["location"];
    delete queryFilter["page"];

    console.log("queryFilter: ", queryFilter);
    this.run = this.run.find(queryFilter);
    return this;
  }
  pagination(perPage) {
    const currentPage = Number(this.query.page) || 1;
    const skip = perPage * (currentPage - 1);

    this.run = this.run.limit(perPage).skip(skip);
    return this;
  }
}
export default APIRequest;
