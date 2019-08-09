from django.http import JsonResponse


def get_all_results(request):
    return JsonResponse({
        "hits": [
            {
                "title": "DPA",
                "text": "Texte intégrale du jugement (Long), à terme peut etre un fichier à télécharger",
                "date": "25/07/2019",
                "amount": "100$",
                "labels": [
                    "Endettement Excessif",
                    "Défaut de conseil"
                ]
            },
        ]
    })
