class Watson:
    _instance = None  # Private class variable to hold the single instance

    def __new__(cls, key):
        if cls._instance is None:
            cls._instance = super(Watson, cls).__new__(cls)
            cls._instance.key = key
        return cls._instance

    def getKey(self):
        print(self.key)