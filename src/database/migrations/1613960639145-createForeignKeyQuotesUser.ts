import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class createForeignKeyQuotesUser1613960639145
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'quotes',
            new TableForeignKey({
                name: 'QuotesUsers',
                columnNames: ['createdBy'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('quotes', 'QuotesUsers');
    }
}
