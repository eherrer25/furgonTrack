import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuParentPage } from './menu-parent.page';

describe('MenuParentPage', () => {
  let component: MenuParentPage;
  let fixture: ComponentFixture<MenuParentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuParentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuParentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
