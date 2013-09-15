var config = module.exports;

config["My tests"] = {
    rootPath: "../",
    environment: "browser", // or "node"
    sources: [
        "website/media/jquery.js",
        "responsive-elements.js"
    ],
    tests: [
        "tests/tests.js"
    ]
};

// Add more configuration groups as needed
