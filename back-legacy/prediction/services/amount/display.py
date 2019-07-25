def print_amounts(amounts):
    detailed_amounts = ""
    for index, amount in enumerate(amounts):
        header = "# Amount: " + str(index) + "\n"
        detailed_amounts += header
        detailed_amounts += str(amount.to_str()) + "\n\n"
    return detailed_amounts
