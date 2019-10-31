const DefaultsTest = {
  fields: {
    id: {
      fieldName: 'id',
      type: 'ID',
    },
    name: {
      fieldName: 'name',
      type: 'string',
    }
  },
  modelName: 'DefaultsTest',
  tableLinkField: 'name',
  fieldOrder: ['name']
}

const PredefinedTest = {
  deletable: false,
  creatable: false,
  displayField: 'foo',
  displayName: 'Predefined Test',
  displayNamePlural: 'Predefined Tests',
  fields: {
    id: {
      fieldName: 'id',
      type: 'ID',
      editable: true,
      displayName: 'ID #',
      showCreate: true,
      showDetail: true,
      showIndex: true,
      showTooltip: true
    },
    name: {
      fieldName: 'name',
      type: 'string',
      editable: false,
      displayName: 'Field Name',
      showCreate: false,
      showDetail: false,
      showTooltip: false
    },
    foo: {
      fieldName: 'foo',
      type: 'string',
      editable: () => true,
      displayName: () => 'foobar',
      showCreate: () => false,
      showDetail: () => false,
      showIndex: () => true,
      showTooltip: () => true
    },
    bar: {
      fieldName: 'bar',
      type: 'string',
      editable: 42,
      showCreate: false,
      showDetail: false,
      showIndex: true,
      showTooltip: true
    }
  },
  hasIndex: false,
  modelName: 'PredefinedTest',
  tableLinkField: 'name',
  fieldOrder: ['id', 'name', 'foo', 'bar']
}

export const schema = {
  DefaultsTest,
  PredefinedTest
}