import Realm from 'realm';

export const DATA_SET = 'dataSeting';
export const PARAM_DATA_SET = 'dataParams';

export const TodoLisrSchema = {
  name: DATA_SET,
  primaryKey: 'id',
  properties: {
    id: 'int',
    token: 'string',
    user_display_name: 'string',
    user_email: 'string',
    user_nicename: 'string',
    avatar: 'string',
    user_role: 'string',
    geo_local: 'string',
    currentLocale: 'string',
  },
};

export const DataParams = {
  name: PARAM_DATA_SET,
  primaryKey: 'id',
  properties: {
    id: 'int',
    amenities: 'string',
    cat: 'string',
    info: 'string',
    types: 'string',
    status: 'string',
    max_area: 'int',
    min_area: 'int',
    geo_long: 'string',
    geo_lat: 'string',
    max_price: 'int',
    min_price: 'int',
    city: 'string',
    search_text: 'string',
  },
};

const databaseOption = {
  path: 'dataSetApp.realm',
  schema: [TodoLisrSchema, DataParams],
  schemaVersion: 0,
};

export const updateUser = newUser =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then(realm => {
        realm.write(() => {
          realm.create(
            DATA_SET,
            {
              id: 0,
              token: newUser.token,
              user_display_name: newUser.user_display_name,
              user_email: newUser.user_email,
              user_nicename: newUser.user_nicename,
              avatar: newUser.avatar,
              user_role: newUser.user_role,
              geo_local: newUser.geo_local,
              currentLocale: newUser.currentLocale,
            },
            true,
          );
          resolve(newUser);
        });
      })
      .catch(error => reject(error));
  });

export const createrUser = newUser =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then(realm => {
        realm.write(() => {
          realm.create(
            DATA_SET,
            {
              id: 0,
              token: '',
              user_display_name: '',
              user_email: '',
              user_nicename: '',
              avatar: '',
              user_role: '',
              geo_local: '',
              currentLocale: '',
            },
            true,
          );
          resolve(newUser);
        });
      })
      .catch(error => reject(error));
  });


export const updateParams = newParams => {
  console.log(newParams);
  return new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then(realm => {
        realm.write(() => {
          realm.create(
            PARAM_DATA_SET,
            {
              id: 0,
              amenities: newParams.amenities,
              cat: newParams.cat,
              info: newParams.info,
              types: newParams.types ? newParams.types : '',
              status: newParams.status,
              max_area: newParams.max_area,
              min_area: newParams.min_area,
              geo_long: newParams.geo_long,
              geo_lat: newParams.geo_lat,
              max_price: newParams.max_price,
              min_price: newParams.min_price,
              search_text: newParams.search_text,
              city: newParams.city,
            },
            true,
          );
          resolve(newParams);
        });
      })
      .catch(error => reject(error));
  });
};

export const queryParams = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then(realm => {
        let allDataSets = realm.objects(PARAM_DATA_SET);
        resolve(allDataSets);
      })
      .catch(error => reject(error));
  });

export const upDateGeoLocal = newData =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then(realm => {
        realm.write(() => {
          realm.create(
            DATA_SET,
            {
              id: 0,
              geo_local: newData,
            },
            true,
          );
          resolve(newData);
        });
      })
      .catch(error => reject(error));
  });

export const deleteDataUser = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then(realm => {
        realm.write(() => {
          let deletingTodoList = realm.objectForPrimaryKey(DATA_SET, 0);
          realm.delete(deletingTodoList);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const queryUser = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOption)
      .then(realm => {
        let allDataSets = realm.objects(DATA_SET);
        resolve(allDataSets);
      })
      .catch(error => reject(error));
  });

export default new Realm(databaseOption);
