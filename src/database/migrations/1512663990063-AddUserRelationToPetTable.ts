import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddUserRelationToPetTable1512663990063 implements MigrationInterface {

    private tableForeignKey = new TableForeignKey({
        name: 'fk_user_pet',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'sample_user',
        onDelete: 'CASCADE',
    });

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey('sample_pet', this.tableForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('sample_pet', this.tableForeignKey);
    }

}
