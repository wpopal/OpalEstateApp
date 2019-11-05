import Realm from 'realm';

export const DATA_SET = 'dataSeting';

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
  },
};

const databaseOption = {
  path: 'dataSetApp.realm',
  schema: [TodoLisrSchema],
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
              geo_local: '',
            },
            true,
          );
          resolve(newUser);
        });
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
