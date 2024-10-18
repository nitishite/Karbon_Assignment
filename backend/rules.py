import datetime


class FLAGS:
    GREEN = 1
    AMBER = 2
    RED = 0
    MEDIUM_RISK = 3  # diplay purpose only
    WHITE = 4  # data is missing for this field


def latest_financial_index(data: dict):
    for index, financial in enumerate(data.get("financials")):
        if financial.get("nature") == "STANDALONE":
            return index
    return 0


def total_revenue(data: dict, financial_index):
    return data["financials"][financial_index]["pnl"]["lineItems"]["net_revenue"]


def total_borrowing(data: dict, financial_index):
    bs = data["financials"][financial_index]["bs"]
    long_term_borrowings = bs["liabilities"]["long_term_borrowings"]
    short_term_borrowings = bs["liabilities"]["short_term_borrowings"]
    total_borrowings = long_term_borrowings + short_term_borrowings

    revenue = total_revenue(data, financial_index)

    return total_borrowings / revenue if revenue != 0 else float("inf")


def iscr_flag(data: dict, financial_index):
    iscr_value = iscr(data, financial_index)
    return FLAGS.GREEN if iscr_value >= 2 else FLAGS.RED


def total_revenue_5cr_flag(data: dict, financial_index):
    revenue = total_revenue(data, financial_index)
    return FLAGS.GREEN if revenue >= 50000000 else FLAGS.RED


def iscr(data: dict, financial_index):
    pnl = data["financials"][financial_index]["pnl"]["lineItems"]
    pbit = pnl["profit_before_interest_and_tax"]
    depreciation = pnl["depreciation"]
    interest = pnl["interest"]

    return (pbit + depreciation + 1) / (interest + 1)


def borrowing_to_revenue_flag(data: dict, financial_index):
    borrowing_ratio = total_borrowing(data, financial_index)
    return FLAGS.GREEN if borrowing_ratio <= 0.25 else FLAGS.AMBER
