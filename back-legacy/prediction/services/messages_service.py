from django.contrib import messages
from django.utils.safestring import mark_safe


def add_link_in_messages(request, link, message):
    full_link = get_request_path(request) + link
    html_message = """
                    <a href="{full_link}">{message}</a>
                """.format(
        full_link=full_link,
        message=message
    )
    messages.info(
        request,
        mark_safe(html_message)
    )


def get_request_path(request):
    return request.scheme + "://" + request.META['HTTP_HOST']