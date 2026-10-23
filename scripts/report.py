"""Print the total sales for one day from a CSV export."""

import csv
import sys


def daily_total(path: str) -> int:
    """Sum the amount_cents column of the export."""
    with open(path, newline="") as handle:
        return sum(int(row["amount_cents"]) for row in csv.DictReader(handle))


if __name__ == "__main__":
    print(daily_total(sys.argv[1]))
