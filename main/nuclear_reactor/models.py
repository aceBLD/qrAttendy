from sqlalchemy import Table, Column, Integer, String
from database import metadata


User = Table(
"users",
metadata,
Column("id", Integer, primary_key=True),
Column("full_name", String),
Column("username", String),
Column("role", String)
)