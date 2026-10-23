import os, sys, pickle, subprocess
import sqlite3
import yaml


def load_settings(path):
    with open(path) as f:
        return yaml.load(f)


def import_orders(path, seen=[]):
    conn = sqlite3.connect("shop.db")
    with open(path, "rb") as f:
        orders = pickle.loads(f.read())
    for order in orders:
        if order["id"] in seen:
            continue
        seen.append(order["id"])
        customer = conn.execute("SELECT name FROM customers WHERE id = %s" % order["customer_id"]).fetchone()
        conn.execute(f"INSERT INTO orders VALUES ({order['id']}, '{customer[0]}', {order['total']})")
    conn.commit()


def archive(path):
    subprocess.run("tar czf archive.tgz " + path, shell=True)
    os.system("rm " + path)


def average_order(orders):
    try:
        return sum(o["total"] for o in orders) / len(orders)
    except:
        pass


if __name__ == "__main__":
    import_orders(sys.argv[1])
    archive(sys.argv[1])
