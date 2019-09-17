const AbstractRepository = require('./abstractRepository');

module.exports = class AbstractEntityRepository extends AbstractRepository {
  async refreshTwoWayRelationManyToOne(
    record,
    sourceModel,
    sourceProperty,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      sourceModel.updateMany(
        {
          _id: { $nin: record._id },
          [sourceProperty]: { $in: record[sourceProperty] },
        },
        {
          $pullAll: {
            [sourceProperty]: record[sourceProperty],
          },
        },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $in: record[sourceProperty] },
        },
        { [targetProperty]: record._id },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $nin: record[sourceProperty] },
          [targetProperty]: record._id,
        },
        { [targetProperty]: null },
      ),
      options,
    );
  }

  async refreshTwoWayRelationOneToMany(
    record,
    sourceProperty,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateOne(
        { _id: record[sourceProperty] },
        { $addToSet: { [targetProperty]: record._id } },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $ne: record[sourceProperty] },
          [targetProperty]: record._id,
        },
        { $pull: { [targetProperty]: record._id } },
      ),
      options,
    );
  }

  async refreshTwoWayRelationManyToMany(
    record,
    sourceProperty,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        { _id: { $in: record[sourceProperty] } },
        { $addToSet: { [targetProperty]: record._id } },
      ),
      options,
    );

    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        {
          _id: { $nin: record[sourceProperty] },
          [targetProperty]: { $in: record._id },
        },
        { $pull: { [targetProperty]: record._id } },
      ),
      options,
    );
  }

  async destroyRelationToMany(
    recordId,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        { [targetProperty]: recordId },
        { $pull: { [targetProperty]: recordId } },
      ),
      options,
    );
  }

  async destroyRelationToOne(
    recordId,
    targetModel,
    targetProperty,
    options,
  ) {
    await this.wrapWithSessionIfExists(
      targetModel.updateMany(
        { [targetProperty]: recordId },
        { [targetProperty]: null },
      ),
      options,
    );
  }
};
