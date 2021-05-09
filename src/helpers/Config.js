/**
 * Updates the user config stored in local storage where the the item
 * is named `config` based on the the given `key`.
 * 
 * If the given key does not exist in the config, it would rather append it to the object.
 * 
 * For example:
 * 
 * ```js
 * // Existing config object:
 * config: {
 *     'user': 'Jess',
 *     'number': '1-800-4342'
 * }
 * 
 * // If you want to modify the name:
 * updateConfig('user', 'David');
 * 
 * // and this would result in:
 * config: {
 *     'user': 'David',
 *     'number': '1-800-4342'
 * }
 * ```
 * @param {String} key 
 * @param {any} value 
 * @returns {JSON} new config
 */
export function updateConfig(key, value) {
    // first get the existing config
    let config = JSON.parse(localStorage.getItem('config'));
    config[key] = value;
    localStorage.setItem('config', JSON.stringify(config));
    console.log(JSON.stringify(config));
    console.log({ key, value });
    return config;
}

export function configEmpty() {
    return JSON.parse(localStorage.getItem('config')).length < 1;
}

export function retrieve(key) {
    try {
        return JSON.parse(localStorage.getItem('config'))[key];

    } catch (err) {
        let config = []
        localStorage.setItem('config', JSON.stringify(config));
        return null;
    }

}

