module.exports = {
    'env': {
        'browser': true,
        "commonjs": true,
        'es6': true,
        "jquery": true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
        'error',
        'single',
         {
        avoidEscape: true,
        allowTemplateLiterals: true
        }
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};