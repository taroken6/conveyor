import React from "react"

const NoModelOverride = {
  deletable: true,
  creatable: true,
  displayField: 'foo',
  displayName: 'No Model Override',
  displayNamePlural: 'No Model Overrides',
  fields: {
    id: {
      fieldName: 'id',
      type: 'ID',
      editable: false,
      displayName: 'ID #',
      showCreate: false,
      showDetail: false,
      showIndex: false,
      showTooltip: false
    },
    name: {
      fieldName: 'name',
      type: 'string',
      editable: true,
      displayName: 'Name',
      showCreate: true,
      showDetail: true,
      showTooltip: true
    }
  },
  hasIndex: true,
  modelName: 'NoModelOverride',
  tableLinkField: 'name',
  fieldOrder: ['name']
}

const ModelOverride = {
  deletable: true,
  creatable: true,
  displayField: 'name',
  displayName: 'Model Override',
  displayNamePlural: 'Model Overrides',
  fields: {
    id: {
      fieldName: 'id',
      type: 'ID',
      editable: false,
      displayName: 'ID #',
      showCreate: false,
      showDetail: false,
      showIndex: false,
      showTooltip: false
    },
    name: {
      fieldName: 'name',
      type: 'string',
      editable: true,
      displayName: 'Name',
      showCreate: true,
      showDetail: true,
      showTooltip: true
    }
  },
  hasIndex: true,
  modelName: 'ModelOverride',
  tableLinkField: 'name',
  fieldOrder: ['name'],
  components: {
    createTitle: props => <h1>Custom Create Title</h1>,
    detailTitle: props => <h1>Custom Detail Title</h1>,
    indexTitle: props => <h1>Custom Index Title</h1>,
    createPage: props => <h1>Custom Create Page</h1>,
    detailPage: props => <h1>Custom Detail Page</h1>,
    indexPage: props => <h1>Custom Index Page</h1>,
    create: props => <h1>Custom Create</h1>,
    detail: props => <h1>Custom Detail</h1>,
    index: props => <h1>Custom Index</h1>
  }
}

export const schema = {
  NoModelOverride,
  ModelOverride
}