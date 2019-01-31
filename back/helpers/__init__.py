from sqlalchemy import inspect


def serialize_model(obj, subitens=None):
    if obj is None:
        return None

    result = {}

    for c in inspect(obj).mapper.column_attrs:
        result[c.key] = getattr(obj, c.key)

        if subitens is not None:
            for subitem in subitens:
                if hasattr(obj, subitem):
                    result[subitem] = serialize_model(getattr(obj, subitem))

    return result


def serialize_model_list(itens, subitens=None):
    return list(map(lambda item: serialize_model(item, subitens), itens))
