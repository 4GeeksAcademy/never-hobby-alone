"""empty message

Revision ID: 2ed71ae6dd87
Revises: 
Create Date: 2024-02-16 18:56:24.896053

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2ed71ae6dd87'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categoria',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('categoria', sa.String(length=250), nullable=True),
    sa.Column('name', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=250), nullable=True),
    sa.Column('email', sa.String(length=250), nullable=True),
    sa.Column('password', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('evento',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('evento', sa.String(length=250), nullable=True),
    sa.Column('descripcion', sa.String(length=250), nullable=True),
    sa.Column('ciudad', sa.String(length=250), nullable=True),
    sa.Column('ubicación', sa.String(length=250), nullable=True),
    sa.Column('fecha', sa.DateTime(), nullable=True),
    sa.Column('precio', sa.String(length=250), nullable=True),
    sa.Column('max_personas', sa.Integer(), nullable=True),
    sa.Column('id_categoria', sa.Integer(), nullable=False),
    sa.Column('user_creador', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_categoria'], ['categoria.id'], ),
    sa.ForeignKeyConstraint(['user_creador'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hobbies',
    sa.Column('categoria_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['categoria_id'], ['categoria.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('categoria_id', 'user_id')
    )
    op.create_table('eventos',
    sa.Column('evento_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['evento_id'], ['evento.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('evento_id', 'user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('eventos')
    op.drop_table('hobbies')
    op.drop_table('evento')
    op.drop_table('user')
    op.drop_table('categoria')
    # ### end Alembic commands ###
