import mysql.connector
import os
import json


from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

connection = mysql.connector.connect(
    host=os.getenv("MYSQL_HOST"),
    port=os.getenv("MYSQL_PORT"),
    user=os.getenv("MYSQL_USER"),
    passwd=os.getenv("MYSQL_PASSWORD"),
    db=os.getenv("MYSQL_DATABASE")
)

cursor = connection.cursor()

file_path = "path_and_predict.jsonl"
with open(file_path, 'r') as jsonl_file:
    # 逐行讀取檔案中的內容
    for line in jsonl_file:
        # 解析JSON數據
        data = json.loads(line)
        cursor.execute(f"INSERT INTO images (filename, ocrlabel) VALUES ('{data['filename']}', '{data['easyocr_values']}');")
        connection.commit()