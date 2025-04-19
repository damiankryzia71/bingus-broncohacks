import os

for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".py"):
            path = os.path.join(root, file)
            with open(path, "rb") as f:
                content = f.read()
                if b"\x00" in content:
                    print(f"Null byte found in: {path}")
